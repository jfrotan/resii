<template>
<section class='hero'>
    <div class='hero-body'>
        <div class='container'>
            <div class='column is-12'>
                <div class='box'>
                  <div class='field'>
                    <div class='control has-text-centered'>
                      <button class='button is-link' @click='goBack()'>Back to All Documents</button>
                    </div>
                  </div>
                  <div class='field'>
                    <div class='control has-text-centered'>
                      <button class='button is-link' @click='saveDocument()'>Save to Computer</button>
                    </div>
                  </div>
                </div>
            </div>
            <div class='column is-12'>
                <div class='has-text-centered'>
                  <canvas id='pdf-canvas'></canvas>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import ResumeService from '@/services/ResumeService';
import pdf from 'pdfjs-dist';
const FileSaver = require('file-saver');

export default {
  name: 'ViewResume',
  data() {
    return {
      blob: []
    };
  },
  components: {
    pdf
  },
  methods: {
    async ViewDocument() {
      try {
        const userEmail = this.$store.state.user.email;
        const fileID = this.$route.params.id;

        /** Note: Just pass params straight into the calling GET function! */
        const response = await ResumeService.GetDocument(userEmail, fileID);

        /** Create a blob locally which is simply our file loaded into memory! The type of these files will be "application/pdf" */
        this.blob = new Blob([response.data], { type: 'application/pdf' });
        let url = URL.createObjectURL(this.blob);

        pdf
          .getDocument(url)
          .then(
            function(pdf) {
              const pageNumber = 1;
              pdf.getPage(pageNumber).then(function(page) {
                const scale = 2;
                const viewport = page.getViewport(scale);

                // Prepare canvas using PDF page dimensions
                let canvas = document.getElementById('pdf-canvas');
                let context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                let renderTask = page.render({
                  canvasContext: context,
                  viewport: viewport
                });

                renderTask.then(function() {});
              });
            },
            function(reason) {
              /** An error occurred when rendering the PDF! */
              // console.log(reason);
            }
          )
          .catch(null, function(err) {
            // console.log(
            //   'Error occured when trying to read the PDF byte stream!'
            // );
          });
      } catch (e) {
        // console.log(e);
      }
    },
    saveDocument() {
      /** Take the blob that's stored in memory client-side and render it as a pdf,
       * then prompt the user to download to their machine! */
      if (this.blob) {
        FileSaver.saveAs(this.blob, this.$route.params.fileName); // TODO: Use the actual file name when saving instead of "document.pdf"
      }
    },
    goBack() {
      this.$router.push({
        name: 'index'
      });
    }
  },
  mounted() {
    this.ViewDocument();
  }
};
</script>

<style>
#pdf-canvas {
  border: 1px solid black;
}
</style>
