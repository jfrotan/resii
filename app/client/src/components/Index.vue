<template>
  <section class='hero'>
    <div class='hero-body'>
      <div class='container'>
        <div class='column is-12'>
          <div class='box'>
            <h4 class='title is-3 has-text-centered'>All Uploaded Documents</h4> 
            <div>
                <vue-good-table
                :columns='columns'
                :rows='rows'
                :perPage='10'
                :paginate='true'
                styleClass='vgt-table bordered'>
                  <template slot="table-column" slot-scope="props">
                    <span v-if="props.column.label =='link'">
                      <label class="url">
                        <p>Details</p>
                      </label>
                    </span>
                    <span v-else>
                      {{props.column.label}}
                    </span>
                  </template>
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field === 'url'">
                      <a href='#' @click='PreviewResume(rows[props.row.originalIndex])'>View Detail</a>
                    </span>
                    <span v-else>
                      {{ props.formattedRow[props.column.field] }}
                    </span>
                  </template>
                </vue-good-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ResumeService from '@/services/ResumeService';

export default {
  name: 'Index',
  data() {
    return {
      columns: [
        {
          label: 'File Name',
          field: 'metadata.originalFileName',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'Tags',
          field: 'metadata.tags',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'Uploaded On',
          field: 'uploadDate',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'MMMM Do YYYY',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'link',
          field: 'url',
          sortable: false,
          filterOptions: {
            enabled: false
          }
        }
      ],
      rows: [],
      PreviewResume: (row) => {
        this.$router.push({
          name: 'view-resume',
          params: {
            id: row._id,
            fileName: row.metadata.originalFileName
          }
        });
      }
    };
  },
  methods: {
    async getDocuments() {
      try {
        // Pass in the user's e-mail as a string to be retrieved by server's body.param
        var response = await ResumeService.GetDocuments(
          this.$store.state.user.email
        );
        // console.log(response.data);

        this.rows = response.data; // This will be an array of files for the respective users
        // });
      } catch (e) {
        this.errorMsg = e;
      }
    }
  },
  mounted() {
    this.getDocuments();
  }
};
</script>

<style>

</style>
