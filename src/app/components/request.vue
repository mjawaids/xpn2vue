<template>
<div>
    <div v-if="mode === 'define'" class="corner-style">
        <md-select name="request" v-model="el.value" class="md-select-value corner-style">
            <md-option value="form">Form</md-option>
            <md-option value="?" selected>?</md-option>
        </md-select>
    </div>
    <div v-if="mode === 'design'" class="corner-style">
        <md-select name="request" v-model="el.value" class="md-select-value corner-style" disabled>
            <md-option value="form">Form</md-option>
            <md-option value="?" selected>?</md-option>
        </md-select>
    </div>
</div>
</template>

<script>
export default {
    name: 'request',
    props: ['el', 'mode']
}
</script>

<style>
.corner-style {
    width:20px !important;
    height:20px !important;
    margin:auto;
}

.md-select-value {
    padding-right: 20px !important;
    line-height: 20px !important;
    min-width:20px;
}
</style>