<template>
    <div id="content">
        <div class="row justify-content-center wrapper">
            <div class="col-12 content-header">
                <b-button v-b-toggle.sidebar-1 class="mb-3 mx-3"><i class="fa fa-bars"></i></b-button><h1>mytask page</h1>
            </div>
            <div class="col-sm-card col-md-card col-lg-card task-list">
                <div class="backlog-header">
                    <h4>Back log</h4>
                    <a v-on:click="showAddModal('backLog')"><i class="fa fa-plus"></i></a>
                </div>
                <div class="scrollContent">
                    <div class="card-content" v-for="task in backLogTasks" :key="task.id">
                        <div class="task-item">
                            <a v-on:click="readMore(task.id)" data-toggle="modal" data-target="#readMoreModal" href="/"><h4 class="font-weight-bold">{{task.title}}</h4></a>
                            <p class="font-weight-bold">{{task.content}}</p>
                            <h6 class="font-weight-bold">added by: {{task.User.username}}</h6>
                            <a v-on:click="changeCategory(task.id, 'toDo')" class="right-btn"><i class="fa fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-card col-md-card col-lg-card task-list">
                <div class="todo-header">
                    <h4>To-do</h4>
                    <a v-on:click="showAddModal('toDo')"><i class="fa fa-plus"></i></a>
                </div>
                <div class="scrollContent">
                    <div class="card-content" v-for="task in todoTasks" :key="task.id">
                        <div class="task-item">
                            <a v-on:click="readMore(task.id)" data-toggle="modal" data-target="#readMoreModal" href="/"><h4 class="font-weight-bold">{{task.title}}</h4></a>
                            <p class="font-weight-bold">{{task.content}}</p>
                            <h6 class="font-weight-bold">added by: {{task.User.username}}</h6>
                            <a v-on:click="changeCategory(task.id, 'backLog')" class="left-btn"><i class="fa fa-arrow-left"></i></a>
                            <a v-on:click="changeCategory(task.id, 'doing')" class="right-btn"><i class="fa fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-card col-md-card col-lg-card task-list">
                <div class="doing-header">
                    <h4>Doing</h4>
                    <a v-on:click="showAddModal('doing')"><i class="fa fa-plus"></i></a>
                </div>
                <div class="scrollContent">
                    <div class="card-content" v-for="task in doingTasks" :key="task.id">
                        <div class="task-item">
                            <a v-on:click="readMore(task.id)" data-toggle="modal" data-target="#readMoreModal" href="/"><h4 class="font-weight-bold">{{task.title}}</h4></a>
                            <p class="font-weight-bold">{{task.content}}</p>
                            <h6 class="font-weight-bold">added by: {{task.User.username}}</h6>
                            <a v-on:click="changeCategory(task.id, 'toDo')" class="left-btn"><i class="fa fa-arrow-left"></i></a>
                            <a v-on:click="changeCategory(task.id, 'done')" class="right-btn"><i class="fa fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-card col-md-card col-lg-card task-list">
                <div class="done-header">
                    <h4>Done</h4>
                    <a v-on:click="showAddModal('done')"><i class="fa fa-plus"></i></a>
                </div>
                <div class="scrollContent">
                    <div class="card-content" v-for="task in doneTasks" :key="task.id">
                        <div class="task-item">
                            <a v-on:click="readMore(task.id)" data-toggle="modal" data-target="#readMoreModal" href="/"><h4 class="font-weight-bold">{{task.title}}</h4></a>
                            <p class="font-weight-bold">{{task.content}}</p>
                            <h6 class="font-weight-bold">added by: {{task.User.username}}</h6>
                            <a v-on:click="changeCategory(task.id, 'doing')" class="left-btn"><i class="fa fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal readmore -->
        <div class="modal fade" id="readMoreModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">{{selectedTask.title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>{{selectedTask.content}}</p>
                        <p>{{selectedTask.id}}</p>
                        <p>{{selectedTask.category}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editTaskModal" data-dismiss="modal">Edit</button>
                        <button type="button" class="btn btn-secondary" v-on:click="deleteTask(selectedTask.id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal edit -->
        <div class="modal fade" id="editTaskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Task</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editTaskForm(selectedTask.id)">
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="task-add-title">Title</label>
                                <input type="text" class="form-control" id="task-add-title" v-model="selectedTask.title">
                            </div>
                            <div class="form-group">
                                <label for="task-add-desc">content</label>
                                <textarea class="form-control" id="task-add-desc" rows="3" v-model="selectedTask.content"></textarea>
                            </div>
                        </div>
                        <div class="addtask-footer px-5 py-2">
                            <button type="submit" class="btn btn-warning font-weight-bold">Save changes</button>
                        </div>
                    </form>
                    </div>
            </div>
        </div>
        
        <!-- Modal Add -->
        <div class="modal fade" id="addTaskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Task</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="addTaskForm">
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="task-add-title">Title</label>
                                <input type="text" class="form-control" id="task-add-title" v-model="addTaskData.title">
                            </div>
                            <div class="form-group">
                                <label for="task-add-desc">content</label>
                                <textarea class="form-control" id="task-add-desc" rows="3" v-model="addTaskData.content"></textarea>
                            </div>
                        </div>
                        <div class="addtask-footer px-5 py-2">
                            <button type="submit" class="btn btn-warning font-weight-bold">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../api/axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: 'MyTasks',
    data() {
        return {
            selectedTask: {
                id: null,
                title: '',
                content: '',
                category: ''
            },
            addTaskData: {
                title: '',
                content: '',
                category: '',
                errorMsg: ''
            }
        }
    },
    props: {
        tasks: Array
    },
    computed: {
        backLogTasks() {
            return this.tasks.filter(task => {
                return task.category === 'backLog'
            })
        },
        todoTasks() {
            return this.tasks.filter(task => {
                return task.category === 'toDo'
            })
        },
        doingTasks() {
            return this.tasks.filter(task => {
                return task.category === 'doing'
            })
        },
        doneTasks() {
            return this.tasks.filter(task => {
                return task.category === 'done'
            })
        }
    },
    methods: {
        showNavbar() {
            document.getElementById('content').classList.toggle('content-change');
            document.getElementById('sidebar').classList.toggle('sidebar-change');
        },
        showAddModal(category) {
            this.addTaskData.category = category
            $('#addTaskModal').modal('show')
        },
        readMore(id) {
            axios({
                method: 'get',
                url: `/task/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                this.selectedTask.id = res.data.id
                this.selectedTask.category = res.data.category
                this.selectedTask.title = res.data.title
                this.selectedTask.content = res.data.content
            })
            .catch(err => {
                $('#readMoreModal').modal('hide');
                this.$emit("toError");
            })
        },
        addTaskForm() {
            axios({
                method: 'post',
                url: '/task/add/0',
                data: {
                    title: this.addTaskData.title,
                    content: this.addTaskData.content,
                    category: this.addTaskData.category
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                $('#addTaskModal').modal('hide');
                this.$emit('toContentMyTask')
            })
            .catch(err => {
                $('#exampleModal').modal('hide');
                this.$emit("toError");
            })
        },
        deleteTask(id) {
            axios({
                method: 'delete',
                url: `/task/delete/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                $('#readMoreModal').modal('hide');
                this.$emit('toContentMyTask')
            })
            .catch(err => {
                $('#readMoreModal').modal('hide');
                this.$emit("toError");
            })
        },
        editTaskForm(id) {
            axios({
                method: 'put',
                url: `/task/edit/${id}`,
                data: {
                    title: this.selectedTask.title,
                    content: this.selectedTask.content
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                $('#editTaskModal').modal('hide');
                this.$emit('toContentMyTask')
            })
            .catch(err => {
                $('#editTaskModal').modal('hide');
                this.$emit("toError");
            })
        },
        changeCategory(id, category) {
            axios({
                method: 'put',
                url: `/task/change/${id}`,
                headers: {
                    token: localStorage.getItem('token'),
                    category: category
                }
            })
            .then(res => {
                this.$emit('toContentMyTask')
            })
            .catch(err => {
                this.$emit("toError");
            })
        }
    },
    created() {
        if (!localStorage.getItem("token")) {
            this.$emit('toLoginForm')
        }
    }
}
</script>

<style>
</style>
