import { v4 as uuidv4 } from 'uuid';

const Dynamic_Components_List = [
  {
    id: uuidv4(),
    title: 'Input',
    description: 'Input Field',
  },

  {
    id: uuidv4(),
    title: 'Chart',
    description: 'ShadCN Chart',
  },

  {
    id: uuidv4(),
    title: 'Table',
    description: 'ShadCN Table',
  },
];

const Dynamic_Components_List_Dropzone_ID =
  'Dynamic-Components-List-Render-Zone';

const Dynamic_Components_List_Sortable_Zone_ID =
  'Dynamic-Components-List--Sortable-Zone-Render-Zone';

export {
  Dynamic_Components_List,
  Dynamic_Components_List_Dropzone_ID,
  Dynamic_Components_List_Sortable_Zone_ID,
};
