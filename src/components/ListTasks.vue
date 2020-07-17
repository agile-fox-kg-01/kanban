<template>
    <div>
        <div class="mycard">
            <div class="header">
                <h3 class="title">{{ category}}</h3>
                <p class="edit-title"><i class="fa fa-bars fa-1x" style="color: white;"></i></p>
            </div>
            
            <CardTask v-for="task in categoryTasks " :key="task.id" :task="task" ></CardTask>       
            <div class="task" v-if="addTask" >
                <input style="padding:15px; border:0;" type="text" v-model="name" class="task-title"  placeholder="Enter name task here!">
            </div>

            <div class="row text-center" v-if="addTask">
                <div class="col-sm-6">
                    <p @click="changeAddTask" class="button-add">Add</p>
                </div>
                <div class="col-sm-6">
                    <p @click="changeAddTask" class="button-add"><i class="fa fa-trash fa-1x" style="color: white; margin-right: 10px;"></i>Delete</p>
                </div>
            </div>


            <!-- <div class="button-add" v-if="">
                <p @click="changeAddTask" >Add</p>
            </div>
            <div class="button-add" v-if="addTask">
                <p @click="changeAddTask" >Delete</p>
            </div> -->
            <div class="button-add" v-if="!addTask" @click="changeAddTask">
                <p><i class="fa fa-plus fa-1x" style="color: white; margin:5px 10px;"></i></p>
                <p  >Add another task</p>
            </div>
        </div>
    </div>
  
</template>

<script>
import CardTask from './CardTask'


export default {
    name: "List Tasks",
    data(){
        return {
            addTask: false,
            name:''
        }
    },
    methods:{
        changeAddTask(){
            this.addTask = !this.addTask
        }
    },
    props: {
        tasks: Array,
        category: String
    },
    components: {
        CardTask
    },
    computed: {
        categoryTasks() {
            let result = []
            for(let i=0;i<this.tasks.length;i++){
                if(this.tasks[i].category == this.category){
                    result.push(this.tasks[i])
                }
            }
            return result

        }
    }
}
</script>

<style>

</style>