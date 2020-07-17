<template>
    <div>
        <div class="task">
            <p class="task-title">{{task.name}}</p>
            <p class="button-next"><i class="fa fa-arrow-circle-right fa-1x"></i></p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardTas",
    props: {
        task: {}
    }

}
</script>

<style>

</style>