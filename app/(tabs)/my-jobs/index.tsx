import { useProfile } from "../../../hooks/useProfile";
import LoadingScreen from "../../../components/common/LoadingScreen";
import PosterJobsScreen from "../../../components/my-jobs/PosterJobsScreen";
import PostedJobsScreen from "../../../components/my-jobs/PosterJobsScreen";
import HelperJobsScreen from "../../../components/my-jobs/HelperJobsScreen";

const MyJobsTab = () => {
  const { profile, loading } = useProfile();

  if (loading) return <LoadingScreen />;

  const isHelper = profile?.role === "helper";

  return isHelper ? <HelperJobsScreen /> : <PosterJobsScreen />;
};

export default MyJobsTab;
