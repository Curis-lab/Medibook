import Error from "../../Error/Error";
import Loading from "../../Loader/Loading";

export function RenderWithCondition({ render, error, isLoading }) {
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error errMessage={error} />;
  }
  return render();
}
