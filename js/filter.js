/**
 * Created by Abhinav on 27-12-2016.
 */

app.filter('pager', function () {
  return function (input, start) {
    start = +start;
    return input.slice(start);
  };
});
