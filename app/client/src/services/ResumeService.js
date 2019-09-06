import Api from '@/services/Api';

export default {
  GetDocument(userEmail, fileID) {
    return Api().get(`view-resume/${userEmail}/${fileID}`, {
      responseType: 'arraybuffer' // Need to specify the type of data to axios for what we're expecting to receive
    });
  },
  GetDocuments(userEmail) {
    return Api().get(`index/${userEmail}`);
  },
  GenerateLatexPDF(resumeInfo) {
    return Api().post('generate-resume', resumeInfo);
  },
  UploadApplication(uploadFile) {
    return Api().post('upload-resume', uploadFile);
  }
};
