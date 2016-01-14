angular.module('boorish.questions', [])

.controller('questionsController', function($scope, $location, $http, Questions, Auth, Courses) {
  $scope.questions = [];
  $scope.courses = [];
  $scope.userId = localStorage.getItem('com.boorish');
  $scope.listFilter = 'allQuestions';
  $scope.allCourses = [];


  $scope.createClass = function () {
    var courseObj = {name: $scope.newClass};
    $http.post('/townhall/courses', courseObj).success(function () {
      console.log('course added..');
      $scope.getAllCourses();
    });
  };

  $scope.createTag = function () {
    var tagObj = {name: $scope.newTag};
    $http.post('/townhall/tags', tagObj).success(function () {
      console.log('tag added..');
      $scope.getTags();
    });
  };

  $scope.init = function() {

    $scope.getAllCourses = function () {
      Courses.getCourses().then(function (data) {
        console.log('get all courses: ', data);
        $scope.allCourses = data.results;
      });
    };
    // function for a user to join a course
    $scope.addToCourse = function (index) {
      console.log('all courses: ', $scope.allCourses);
      console.log('index of course: ', index);
      var course = $scope.allCourses[index];
      console.log('course: ', course);
      var id = course.id;
      $scope.userCourseIds.push(id);
      var associationObject = {
        UserId: +$scope.userId,
        CourseId: id
      };
      $http.post('/townhall/CourseUsers', associationObject)
        .success(function () {
          console.log('successful post to CourseUsers');
        });
    };

    $scope.getTags = function () {
      $http.get('/townhall/tags').success(function (data) {
        $scope.allTags = data.results;
      });
    };

    $scope.getTags();
    $scope.getAllCourses();

    Questions.getAllQuestions().then(function(data) {
      console.log('get all questions: ', data);
      $scope.questions = data.data.results;
      // get info for user after getting all questions
      // $scope.questions is default list of questions on main page
      Courses.getAllCoursesForUser($scope.userId).then(function (data) {
        console.log('user course data: ', data);
        $scope.userCourseIds = data.userCourseIds;
        $scope.userInCourses = data.userIn;
        $scope.userNotInCourses = data.userNotIn;

        // get questions for classes user is in only
        // stored in %scope.userCourseQuestions
        // used for secondary view of questions ('My Classes')
        if ($scope.questions && $scope.userCourseIds) {
          $scope.userCourseQuestions = $scope.questions.reduce(function (array, question) {
            if ($scope.userCourseIds.indexOf(question.id)) {
              array.push(question);
            }
            return array;
          }, []);
          console.log('users course questions: ', $scope.userCourseQuestions);
        }

      })
    })

  };


  //On initial reroute after Google Authentication Set the User
  Auth.setUser()
  .then(function(){
    // if user is not authenticated, reroute to /signin
    if (!Auth.isAuth()) {
      console.log("Failed isAuth check")
      $location.path('/signin') 
    // else show questions
    } else {
      $scope.init();
    }
  })

});