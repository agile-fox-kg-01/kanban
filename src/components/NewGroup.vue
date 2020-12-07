<template>
    <div id="content">
        <div class="row">
            <div class="col-12 content-header">
                <b-button v-b-toggle.sidebar-1 class="mb-3 mx-3"><i class="fa fa-bars"></i></b-button><h1>Group</h1>
            </div>
            <div class="col-6">
                <form @submit.prevent="addGroupForm">
                    <h1>New Group</h1>
                    <div class="form-group">
                    <label for="task-add-title">Title</label>
                    <input
                        type="text"
                        class="form-control"
                        id="task-add-name"
                        v-model="addGroupData.name"
                    />
                    </div>
                    <div class="form-group">
                    <label for="task-add-desc">content</label>
                    <textarea
                        class="form-control"
                        id="task-add-desc"
                        rows="3"
                        v-model="addGroupData.description"
                    ></textarea>
                    </div>
                    <div class="form-group">
                    <label for="task-add-desc">group code</label>
                    <input
                        type="text"
                        class="form-control"
                        id="task-add-groupcode"
                        v-model="addGroupData.groupCode"
                    />
                    </div>
                    <div class="addtask-footer px-5 py-2">
                    <button type="submit" class="btn btn-warning font-weight-bold">Save changes</button>
                    </div>
                </form>
            </div>
            <div class="col-6">
                <form @submit.prevent="joinGroup">
                    <h1>Join Group</h1>
                    <div class="form-group">
                        <label for="task-add-title">Group code</label>
                        <input
                            type="text"
                            class="form-control"
                            id="task-add-name"
                            v-model="joinGroupCode"
                        />
                    </div>
                    <div class="addtask-footer px-5 py-2">
                    <button type="submit" class="btn btn-warning font-weight-bold">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../api/axios'

export default {
    name: 'NewGroup',
    data() {
        return {
            addGroupData: {
                name: "",
                description: "",
                groupCode: ""
            },
            joinGroupCode: ''
        };
    },
    methods: {
        addGroupForm() {
            axios({
                method: 'post',
                url: '/group/add',
                data: {
                    name: this.addGroupData.name,
                    description: this.addGroupData.description,
                    groupCode: this.addGroupData.groupCode
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                this.$emit('fetchDataGroups')
                this.$emit('toContentGroupTask',res.data.id)
            })
            .catch(err => {
                this.$emit("toError");
            })
        },
        joinGroup() {
            axios({
                method: 'post',
                url: '/group/join',
                data: {
                    groupCode: this.joinGroupCode
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                this.$emit('fetchDataGroups')
                this.$emit('toContentGroupTask',res.data.id)
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
