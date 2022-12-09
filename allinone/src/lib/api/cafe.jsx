import client from './client';


/** 지역 정보 **/
export const getRegion = () => {
  return client.get(`/v2/cafe-map/region`);
};

/** 카테고리 정보 **/
export const getCategory = () => {
  return client.get(`/v2/cafe-map/category`);
};

/** 카페 검색 **/
export const searchCafe = ({ cafe, province, city, category }) => {
  return client.get(
    `/v2/cafe-map/search`,
    {
      params: {
        cafe,
        province,
        city,
        category,
      },
    },
  );
};

/** 카페 선택 **/
export const getCafeDetail = ({ cafe_id }) => {
  return client.get(
    `/v2/cafe-map/${cafe_id}/evaluate`,
  );
};

/** 평가 작성 **/
export const evaluate = ({ token, cafe_id, request, photos }) => {
  console.log(cafe_id);

  client.post(
    `/v2/cafe-map/${cafe_id}/evaluate`,
    {
      "request": request,
      "phtos": photos

    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
};
/** 평가 수정 **/
export const modifyEvaluation = ({ token, cafe_id, star_rating, content, category_1, category_2, category_3 }) => {
  client.put(
    `/v2/cafe-map/${cafe_id}/evaluate`,
    {
      star_rating,
      content,
      category_1,
      category_2,
      category_3
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
};
/** 평가 삭제 **/
export const deleteEvaluate = ({ token, cafe_id, eval_id }) => {
  client.delete(`/v2/cafe-map/${cafe_id}/evaluate/${eval_id}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
};


/** 스크랩 하기 **/
export const scrap = ({ token, cafe_id }) => {
  console.log(token);
  client.post(
    `/v2/cafe-map/${cafe_id}/scrap`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
};

/** 스크랩 확인 **/
export const getScraps = ({ token }) => {
  return client.get(
    `/v2/cafe-map/scrap`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
};

/** 스크랩 취소 **/
export const deleteScrap = ({ token, cafe_id, scrap_id }) => {
  client.delete(`/v2/cafe-map/${cafe_id}/scrap/${scrap_id}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
};