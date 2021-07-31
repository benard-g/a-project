import { FC } from 'react';

import { useHomePageQuery } from './query.codegen';

const HomePage: FC = () => {
  const { loading, data } = useHomePageQuery();

  return (
    <div>
      <h1>Hello</h1>
      <textarea
        readOnly
        style={{ width: 600, height: 300 }}
        value={JSON.stringify({ loading, data }, null, 2)}
      />
    </div>
  );
};

export default HomePage;
