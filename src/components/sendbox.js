const tasks = [
    {
      id: 1,
      title: "Login Page",
      category: "backlog"
    },
    {
      id: 2,
      title: "Register Page",
      category: "done"
    },
    {
      id: 3,
      title: "Register Page",
      category: "backlog"
    },
    {
      id: 4,
      title: "Register Page",
      category: "backlog"
    }
  ];
  const category = "backlog";
  const result = [];

  for (let i =0; i< tasks.length; i++){
      if ( tasks[i].category == category){
          result.push(tasks[i])
      }
  }

  console.log(result)