
//Business Logic
export default class StolenBike {
  static getStolenBike(location) {
    return fetch(`https://bikeindex.org:443/api/v3/search?q=${location}page=1&per_page=25&distance=10&stolenness=proximity&${process.env.API_KEY}`)
      .then(function (response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);

        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        return error.message;
      });
  }

}
