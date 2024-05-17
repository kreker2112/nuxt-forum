type ICategory = {
  title: string;
  name: string | null;
  message?: string;
  image?: string;
  link?: string;
  lessonQuantity?: number;
  tags?: ITag[];
};

type ITag = {
  title: string;
  link?: string;
};
