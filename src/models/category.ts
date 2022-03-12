export interface CategoryModel {
  id: string;
  name: string;
  icon: string;
  parentId?: string;
  parent?: CategoryModel;
  subcategories?: CategoryModel[];
}
