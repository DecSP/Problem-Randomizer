// Mocks useRouter
// Please refer to this: https://github.com/vercel/next.js/issues/7479#issuecomment-587145429
const useRouter = jest.spyOn(require("next/router"), "useRouter");

export function mockNextUseRouter(props: {
  route: string;
  pathname: string;
  query?: string;
  asPath?: string;
  push: () => void;
}) {
  useRouter.mockImplementationOnce(() => ({
    route: props.route,
    pathname: props.pathname,
    query: props.query,
    asPath: props.asPath,
    push: props.push,
  }));
}
