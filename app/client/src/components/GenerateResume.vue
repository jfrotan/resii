<template>
  <section class='hero'>
    <div class='hero-body'>
      <!-- TODO: Change to !shwoInput when done bulma styling -->
      <div v-if='!showInputs' class='container'>
        <div class='title has-text-centered'>Available Templates</div>
        <carousel-3d @after-slide-change='onAfterSlideChange' :width= '600' :height="700">
          <!-- <slide v-for='(slide, i) in slides' :key='slide' :index='i'>
            {{i}}
          </slide> -->
          <slide :index='0'>
            <img v-bind:src="'src/assets/template1.png'">
          </slide>
          <slide :index='1'>
            <img v-bind:src="'src/assets/template2.png'">
          </slide>
          <slide :index='2'>
            <img v-bind:src="'src/assets/template3.png'">
          </slide>
        </carousel-3d>
        <div class='control has-text-centered'>
          <a @click='SelectTemplate' class='button is-info '>Choose Template Number {{slideNumber + 1}}</a>
        </div>
      </div>

      <div v-if='showInputs' class='container'>
        <div class='container'>
          <div class='column is-6 is-offset-3'>
            <div class='box'>
<!-- PROFILE -->
              <h1 class ='title has-text-centered'>Profile</h1>

              <div class='field'>
                <label class='label'>First Name</label>
                <div class='control'>
                  <input class='input' type='text' v-model='FirstName' placeholder='Max'>
                </div>
              </div>

              <div class='field'>
                <label class='label'>Last Name</label>
                <div class='control'>
                  <input class='input' type='text' v-model='LastName' placeholder='Farwell'>
                </div>
              </div>

              <div class='field'>
                <label class='label'>Address</label>
                <div class='control'>
                  <input class='input' type='text' v-model='ProfileAddress' placeholder='Toronto, ON'>
                </div>
              </div>

              <div class='field'>
                <label class='label'>Email</label>
                <div class='control'>
                  <input class='input' type='email' v-model='Email' placeholder='Max.Farwell@gmail.com'>
                </div>
              </div>

              <div class='field'>
                <label class='label'>Phone Number</label>
                <div class='control'>
                  <input class='input' type='text' v-model='PhoneNumber' placeholder='123-456-7890'>
                </div>
              </div>

              <div class='field'>
                <label class='label'>Portfolio</label>
                <div class='control'>
                  <input class='input' type='text' v-model='Links.Portfolio' placeholder='mfarwell.com'>
                </div>
              </div>

              <div class='field'>
                <label class='label'>LinkedIn</label>
                <div class='control'>
                  <input class='input' type='text' v-model='Links.LinkedIn' placeholder='linkedin.com/in/MFarwell'>
                </div>
              </div>

              <div class='field'>
                <label class='label'>GitHub</label>
                <div class='control'>
                  <input class='input' type='text' v-model='Links.GitHub' placeholder='github.com/MFarwell'>
                </div>
              </div>

              <div class='field'>
                <label class='label'>Other</label>
                <div class='control'>
                  <input class='input' type='text' v-model='Links.Other' placeholder='twitter.com/mfarwell'>
                </div>
              </div>

              <hr>
<!-- EDUCATION -->
              <h1 class ='title has-text-centered'>Education</h1>
              <div class='field'>
                <education-field v-for='education in educations' :key='education' :school='education'>
                </education-field>

              </div>
              <div class='control'>
                  <a class='button is-info' @click='addEducationSection'> Add education </a>
                  <a class='button is-info' @click='removeEducationSection'> Remove education </a>
              </div>
              <hr>
<!-- WORK EXPERIENCE -->
              <h1 class ='title has-text-centered'>Work Experience</h1>
              <div class='field'>
                <work-experience-field v-for='experience in workExperiences' :key='experience' :work='experience'>
                </work-experience-field>
              </div>
              <div class='control'>
                  <a class='button is-info' @click='addWorkSection'> Add work experience </a>
                  <a class='button is-info' @click='removeWorkSection'> Remove skill work experience </a>
              </div>
              <hr>
<!-- SKILL GROUP -->
              <h1 class ='title has-text-centered'>Skills</h1>
              <div class='field'>
                <skill-group-field v-for='skill in skillGroups' :key='skill' :group='skill'>
                </skill-group-field>
              </div>
              <div class='control'>
                  <a class='button is-info' @click='addSkillGroupSection'> Add skill group </a>
                  <a class='button is-info' @click='removeSkillGroupSection'> Remove skill group </a>
              </div>
              <hr>
<!-- PROJECTS -->
              <h1 class ='title has-text-centered'>Projects</h1>
              <div class='field'>
                <project-field v-for='project in projects' :key='project' :proj='project'>
                </project-field>
              </div>
              <div class='control'>
                  <a class='button is-info' @click='addProjectSection'> Add project </a>
                  <a class='button is-info' @click='removeProjectSection'> Remove project </a>
              </div>
              <hr>
<!-- AWARDS -->
              <h1 class ='title has-text-centered'>Awards</h1>
              <div class='field'>
                <award-field v-for='award in awards' :key='award' :awd='award'>
                </award-field>
              </div>
              <div class='control'>
                  <a class='button is-info' @click='addAwardSection'> Add award </a>
                  <a class='button is-info' @click='removeAwardSection'> Remove award </a>
              </div>
              <hr>
<!-- SUBMIT -->
              <div class='field'>
                <div class='control has-text-centered'>
                  <button class='button is-link' @click='GenerateResume'>Generate Resume!</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
import ResumeService from '@/services/ResumeService';
import EducationField from '@/components/inputField/Education';
import SkillGroupField from '@/components/inputField/SkillGroup';
import WorkExperienceField from '@/components/inputField/WorkExperience';
import ProjectField from '@/components/inputField/Project';
import AwardField from '@/components/inputField/Award';

export default {
  data() {
    return {
      FinishedGeneratingPDF: false,
      page: 1,
      showInputs: false,
      slideNumber: 0,
      slides: 3,
      numOfLinks: 1,

      FirstName: '',
      LastName: '',
      ProfileAddress: '',
      Email: '',
      PhoneNumber: '',
      Links: {
        Portfolio: '',
        LinkedIn: '',
        GitHub: '',
        Other: ''
      },
      educations: [],
      workExperiences: [],
      skillGroups: [],
      projects: [],
      awards: []
    };
  },
  components: {
    Carousel3d,
    Slide,
    EducationField,
    SkillGroupField,
    ProjectField,
    WorkExperienceField,
    AwardField
  },
  methods: {
    SelectTemplate() {
      this.showInputs = true;
      //   console.log('Template #' + this.slideNumber + ' chosen')
    },
    onAfterSlideChange(index) {
      //   console.log(
      //     '@onAfterSlideChange Callback Triggered',
      //     'Slide Index: ' + index
      //   )
      this.slideNumber = index;
    },
    addEducationSection() {
      this.educations.push({
        SchoolName: '',
        SchoolLocation: '',
        Degree: '',
        Major: '',
        Gpa: '',
        GraduationDate: ''
      });
    },
    removeEducationSection() {
      this.educations.pop();
    },
    addWorkSection() {
      this.workExperiences.push({
        CompanyName: '',
        JobLocation: '',
        JobTitle: '',
        JobStartDate: '',
        JobEndDate: '',
        JobDuties: []
      });
    },
    removeWorkSection() {
      this.workExperiences.pop();
    },
    addSkillGroupSection() {
      this.skillGroups.push({ Name: '', Description: '' });
    },
    removeSkillGroupSection() {
      this.skillGroups.pop();
    },
    addProjectSection() {
      this.projects.push({
        Name: '',
        Description: ''
      });
    },
    removeProjectSection() {
      this.projects.pop();
    },
    addAwardSection() {
      this.awards.push({
        Name: '',
        Description: ''
      });
    },
    removeAwardSection() {
      this.awards.pop();
    },
    async GenerateResume() {
      try {
        // Send a json object to the database, w/e is passed. We access via response.body/(this is handled/bundled by body-parser)
        var response = await ResumeService.GenerateLatexPDF({
          profile: {
            fullName: this.FirstName + ' ' + this.LastName,
            address: this.ProfileAddress,
            email: this.Email,
            phoneNumber: this.PhoneNumber,
            links: this.Links
          },
          // this.educations, is an array of education obj that has child member details
          educations: this.educations,
          workExperiences: this.workExperiences,
          skills: this.skillGroups,
          projects: this.projects,
          awards: this.awards
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
