import React, { useEffect, useState } from 'react';
import KakaoMap from '../../components/cafe/KakaoMap';
import CafeSideBar from '../../components/cafe/CafeSideBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { loadCategory, loadRegion, reset, searchCafe } from '../../modules/cafe/search';


const CafeContainer = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, regions, categories, cafes } = useSelector(
    ({ auth, cafeSearch }) => ({
      user: auth.user,
      regions: cafeSearch.regions,
      categories: cafeSearch.categories,
      cafes: cafeSearch.cafes,
    }),
  );

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState({});
  const [tmpCenter, setTmpCenter] = useState({});
  const [finalCenter, setFinalCenter] = useState({
    lat: 37.573898,
    lng: 126.973131,
  });

  const [request, setRequest] = useState({
    cafe: '',
    province: '',
    city: '',
    category: '',
  });


  useEffect(() => {
    dispatch(loadRegion());
    dispatch(loadCategory());
  }, [dispatch]);

  useEffect(() => {
    if (regions != null) {
      parseRegions();
    }
  }, [regions, request]);


  const onChange = (e) => {
    let result = {
      ...request,
      [e.target.name]: e.target.value,
    };
    setRequest(result);

    if (e.target.name == 'city') {
      let targetProvince = cities[request['province']];
      for (let i = 0; i < targetProvince.length; i++) {
        if (targetProvince[i].city == e.target.value) {
          const tmpCenter = {
            lat: targetProvince[i]['latitude'],
            lng: targetProvince[i]['longitude'],
          };
          setTmpCenter(tmpCenter);
          break;
        }
      }
    }
  };

  const onSubmit = (e) => {
    dispatch(searchCafe(request));
    setRequest({
      cafe: '',
      province: '',
      city: '',
      category: '',
    });
    setFinalCenter(tmpCenter);
    e.preventDefault();
  };

  const onClickInput = () => {
    dispatch(reset());
  };

  const parseRegions = () => {
    let tmpProvinces = [];
    let tmpCity = {};
    for (let i = 0; i < regions.length; i++) {
      tmpCity = {
        ...tmpCity,
        [regions[i]['province']]: regions[i].list,
      };

      tmpProvinces.push(regions[i]['province']);
    }
    setProvinces(tmpProvinces);
    setCities(tmpCity);
  };

  return (
    <>
      <CafeSideBar
        provinces={provinces} cities={cities} categories={categories}
        onClickInput={onClickInput} onChange={onChange} onSubmit={onSubmit}
        cafes={cafes} request={request} />
      <KakaoMap center={finalCenter} cafes={cafes} />
    </>
  );
};

export default CafeContainer;