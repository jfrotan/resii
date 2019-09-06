<template>
    <section class='hero'>
        <div class='hero-body'>
            <div class='container'>
                <div class='column is-10 is-offset-1'>
                    <div class='box'>
                        <h4 class='title is-3 has-text-centered'>Upload A New Document</h4> 
                        <!-- File browser -->
                        <div class="file has-name is-right is-fullwidth">
                        <label class="file-label">
                            <span class="file-cta">
                                <span class="file-icon">
                                    <icon name="cloud-upload" scale="3"></icon>
                                </span>
                                <input class='file-input' type="file" id="file" ref="file" accept=".docx,.doc,.pdf" name='resume' v-on:change="handleFileUpload()">
                                <span class="file-label">
                                    Choose a file…
                                </span>
                            </span>
                            <span class="file-name">
                                {{ resumeName }}
                            </span>
                        </label>
                        </div>

                        <hr class='navbar-divider'>
                        <h4 class='title is-3 has-text-centered'>Add Tags</h4> 
                        <div class='column is-8 is-offset-2'>
                            <document-tag :TagList='tags'></document-tag>
                        </div>
                        <div class='field has-addons'>
                            <div class='control is-expanded'>
                                <input v-model.trim='newTag' class='input is-primary' type='text' placeholder='Tag Name'>
                            </div>
                            <div class='control'>
                                <!-- TODO: render a '+' icon instead of text -->
                                <a class='button is-info' @click='AddNewTag'> Add Tag
                                </a>   
                            </div>
                        </div>

                        <hr class='navbar-divider'>
                        
                        <!-- Submission button -->
                        <div class='control has-text-centered'>
                            <input @click='SubmitDocuments' class='button' type='submit' value='Start Upload'>
                        </div>
                        <div id="successMsg" class='has-text-centered'>
                            {{ successMsg }}
                        </div>
                        <div id="errorMsg" class='has-text-centered'>
                            {{ errorMsg }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SubmitModal from '@/components/Modal';
import DocumentTag from '@/components/Tag';
import ResumeService from '@/services/ResumeService';
import Icon from 'vue-awesome/components/Icon';

export default {
  data() {
    return {
      ShowModal: false,
      newTag: '',
      tags: [],
      file: '',
      resumeName: '',
      successMsg: '',
      errorMsg: ''
    };
  },
  methods: {
    AddNewTag() {
      if (this.newTag) {
        this.tags.push(this.newTag);
      }
      this.newTag = '';
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.resumeName = this.file.name;
      this.successMsg = '';
      this.errorMsg = '';
    },
    async SubmitDocuments() {
      try {
        /** NOTE: Must append() the simple string before the file otherwise
         * it will not send the string for whatever reason
         * Reference material: https://stackoverflow.com/questions/39589022/node-js-multer-and-req-body-empty
         */
        let formData = new FormData();
        formData.append('userEmail', this.$store.state.user.email);
        formData.append('originalFileName', this.file.name);
        formData.append('tags', this.tags);
        formData.append('file', this.file);

        var response = await ResumeService.UploadApplication(formData);
        this.successMsg = response.data.success;
        this.errorMsg = '';
      } catch (e) {
        // console.log(e);
        this.errorMsg = e.response.data.error;
        this.successMsg = '';
      }

      this.resumeName = '';
      this.file = null;
      this.NewTag = '';
    }
  },
  components: {
    SubmitModal,
    DocumentTag,
    Icon
  }
};
</script>
<style>
#successMsg {
  color: green;
}
#errorMsg {
  color: red;
}
</style>
