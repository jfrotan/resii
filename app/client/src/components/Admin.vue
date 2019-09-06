<template>
  <section class='hero'>
    <div class='hero-body'>
      <div class='container'>
        <div class='column is-12'>
          <div class='box'>
            <h4 class='title is-3 has-text-centered'>All Users</h4> 
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
                      <a href='#' @click='toggleUserStatus(rows[props.row.originalIndex])'>
                        <span v-if="props.row.accountStatus === 'active'">
                          Disable
                        </span>
                        <span v-else>
                          Activate
                        </span>
                      </a>
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
import AdminService from '@/services/AdminService';

export default {
  name: 'Index',
  data() {
    return {
      columns: [
        {
          label: 'User Email',
          field: 'email',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'Account Role',
          field: 'accountRole',
          sortable: false,
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'Account Status',
          field: 'accountStatus',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'Toggle Account Status',
          field: 'url',
          sortable: false,
          filterOptions: {
            enabled: false
          }
        }
      ],
      rows: [],
      toggleUserStatus: (row) => {
        this.toggleStatus(row.email);
      }
    };
  },
  methods: {
    async toggleStatus(userEmail) {
      try {
        var response = await AdminService.ToggleStatus({
          userEmail: userEmail
        });

        this.rows = response.data;
      } catch (e) {
        this.errorMsg = e;
      }
    },
    async getUserList() {
      try {
        // Send a json object to the database, w/e is passed. We access via response.body - (this is handled/bundled by body-parser)
        // We receive the url for redirection in the response.
        var response = await AdminService.GetUsers(
          this.$store.state.user.email
        );
      } catch (e) {
        this.errorMessage = e.response.data.error;
      }

      this.rows = response.data; // This will be an array of files for the respective users
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>

<style>

</style>
