import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { deleteEvaluation, loadCafeDetail, scrap, writeEvaluation } from '../../modules/cafe/detail';
import CafeSearchDetail from '../../components/cafe/CafeSearchDetail';
import { useParams } from 'react-router-dom';
import { evaluate } from '../../lib/api/cafe';
import AskConfirmModal from '../../common/modal/AskConfirmModal';

const CafeDetailContainer = () => {

  const dispatch = useDispatch();

  const { cafe_id } = useParams();

  const { user, regions, categories, cafes, detail } = useSelector(
    ({ auth, cafeSearch, cafeDetail }) => ({
      user: auth.user,
      regions: cafeSearch.regions,
      categories: cafeSearch.categories,
      cafes: cafeSearch.cafes,
      detail: cafeDetail.detail,

    }),
  );

  const [categorySelected, setCategorySelected] = useState([]);

  const toggleActive = (e) => {
    let tmpActives = [...categorySelected];
    if (tmpActives.find(name => name == e.target.value)) {
      let result = tmpActives.filter(name => name != e.target.value);
      setCategorySelected(result);
    } else {
      if (tmpActives.length < 3) {
        tmpActives.push(e.target.value);
        setCategorySelected(tmpActives);
      }
    }
  };

  const [modalShow, setModalShow] = useState(false);

  const onClickScrapConfirm = () => {
    dispatch(scrap({
      token: user.accessToken,
      cafe_id,
    }));
  };

  useEffect(() => {
    dispatch(loadCafeDetail({ cafe_id }));
  }, [dispatch]);

  const [request, setRequest] = useState({
    star_rating: '',
    content: '',
    category_1: '',
    category_2: '',
    category_3: '',
  });


  const onChange = (e) => {
    let result = {
      ...request,
      [e.target.name]: e.target.value,
    };
    setRequest(result);
  };

  const onClickSubmit = (cafe_id) => {

    let categories = {};

    for (let i = 0; i < categorySelected.length; i++) {
      console.log(categorySelected[i]);
      categories = {
        ...categories,
        ['category_' + (i + 1)]: categorySelected[i],
      };
    }

    const formData = new FormData();
    const result = {
      star_rating: request.star_rating,
      content: request.content,
      category_1: categories.category_1,
      category_2: categories.category_2,
      category_3: categories.category_3,
    };
    formData.append('request', new Blob([JSON.stringify(result)], { type: 'application/json' }));


    dispatch(writeEvaluation({
      token: user.accessToken,
      cafe_id,
      request : formData,
      photos: null
    }));

    setRequest({
      star_rating: '',
      content: '',
      category_1: '',
      category_2: '',
      category_3: '',
    });
    // window.location.reload();
  };

  const onClickDelete = (cafe_id, eval_id) => {
    dispatch(deleteEvaluation({
      token: user.accessToken,
      cafe_id: cafe_id,
      eval_id: eval_id,
    }));
    window.location.reload();

  }

  const onClickStar = (rating) => {
    let result = {
      ...request,
      star_rating: rating,
    };
    setRequest(result);
  };

  return (
    <>
      <CafeSearchDetail
        detail={detail}
        categories={categories}
        onChange={onChange}
        onClickSubmit={onClickSubmit}
        onClickStar={onClickStar}
        onClickDelete={onClickDelete}
        toggleActive={toggleActive}
        onToggleModal={() => setModalShow(true)}
        categoryActive={categorySelected}
      />
      <AskConfirmModal
        show={modalShow}
        onClick={onClickScrapConfirm}
        onHide={() => setModalShow(false)}
      />

    </>
  );
};

export default CafeDetailContainer;