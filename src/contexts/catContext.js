const url =
  "https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_tsajPiuraUElbMg02ZXoB0xjlNtutoamS75kWTdQKYQ3pHWnaWAuRjw8MRcX98oD&breed_ids=acur&breed_ids=pers&breed_ids=bslo&breed_ids=birm&breed_ids=sfol&breed_ids=ragd&breed_ids=tang";

function catContext() {
  const cats = [];

  async function fetchData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      cats.push(...data);
    } catch (err) {
      console.log(err.message);
    }
  }

  function getCats() {
    return cats;
  }

  return { fetchData, getCats };
}

export default catContext;
