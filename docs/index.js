import basicInfo from './basicInfo.js';
import servers from './servers.js';
import tags from './tags.js';
import components from './components.js';
import users from './users/index.js';
import students from './students/index.js';
import evaluations from './evaluations/index.js';

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...users.paths,
    ...students.paths,
    ...evaluations.paths,
  },
};
