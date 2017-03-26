var app = new Vue({
  el: '#root',
  data: {
    update_id:'',
    update_title:'',
    update_content:'',
    title:'',
    content: '',
    forums: [],
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    userid: localStorage.getItem("userid")
  },
  methods: {
    getForum: function () {
      axios.get('http://localhost:3000/api/forum'
    ).then(function (res) {
      app.forums = res.data
    }).catch(function (err) {
      console.log(err);
    })
  },
  addForum: function () {
    axios.post('http://localhost:3000/api/forum',
    {
      title: app.title,
      content: app.content,
      author: app.userid
    },{
      headers: {token: app.token}
    }
  ).then(function (res) {
    if(res.data.title == app.title){
      swal("Good job!", "Forum Posted", "success")
      app.getForum();
    }else{
      swal("Oh No!", "Something wrong", "failed")
      app.getForum()
    }
  }).catch(function (err) {
    console.log(err);
  })
},
getDataById: function (id) {
  axios.get('http://localhost:3000/api/forum/'+id,
  {headers: {token: app.token}}
).then(function (res) {
  app.update_title = res.data.title,
  app.update_content = res.data.content,
  app.update_id = res.data._id
}).catch(function (err) {
  console.log(err);
})
},
updateForum: function (id) {
  swal({
    title: "Are you sure?",
    text: "Your data will be change",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, update it!",
    closeOnConfirm: false
  },
  function(){
    axios.put('http://localhost:3000/api/forum/'+id,
    {
      title: app.update_title,
      content: app.update_content,
    },{
      headers: {token: app.token}
    }
  ).then(function (res) {
    swal("Updated!", "Your imaginary file has been deleted.", "success");
    app.getForum();
  }).catch(function (err) {
    console.log(err);
  })

});
},
deleteForum:function (id) {
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this forum!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false
  },
  function(){
    axios.delete('http://localhost:3000/api/forum/'+id,
    {headers: {token: app.token}}
  ).then(function (res) {
    app.getForum()
    swal("Deleted!", "Your imaginary file has been deleted.", "success");
  }).catch(function (err) {
    console.log(err);
  })
});
},
logout:function () {
  localStorage.removeItem("userid")
  localStorage.removeItem("username")
  localStorage.removeItem("token")
  window.location.href = 'http://127.0.0.1:8080/login.html'
},
resetButton: function () {
  app.title = ""
  app.content = ""
}
}
})

app.getForum()
