<template>
    <div class='modal is-active' >
        <div class='modal-background'>
        </div>
        <div class='modal-content'>
            <div class='modal-card '>
                <header class='modal-card-head'>
                  <p class='modal-card-title'>Success!</p>
                  <button class='delete' @click="$emit('close')" aria-label='close'></button>
                </header>
                <section class='modal-card-body'>
                <!-- Content ... -->
                    {{ModalMessage}}
                </section>
                <footer class='modal-card-foot '>
                    <div class='container has-text-centered'>
                        <button class='button is-success' @click="$emit('close')">Close</button>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['ModalMessage']
};
</script>

<style>

</style>
