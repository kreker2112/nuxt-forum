type Series = {
  id: number;
  name: string;
  displayName: string | null;
  url: string;
  topicId: number | null;
  image: string | null;
  accentColor: string | null;
};

type Video = {
  id: number;
  url: string;
  host_type: string;
  host_id: string;
  title: string;
  subtitle: string;
  description: string | null;
  image: string | null;
  topicId: number;
  seriesId: number | null;
  seriesPosition: number | null;
  accentColor: string | null;
};
