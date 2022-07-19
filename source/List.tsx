import React, { useEffect, useState } from 'react';
import { Text } from 'ink';
import Table from 'ink-table';
import list from './lib/list';

function List() {
  const [packagesPath, setPackagesPath] = useState('');
  const [packages, setPackages] = useState<{ name: string; path: string }[]>(
    [],
  );
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { packagesPath: f, packages: p } = await list();
        setPackagesPath(f);
        setPackages(p);
      } catch (e) {
        if (e instanceof Error) {
          setErrorMessage(e?.message);
        }
      }
    })();
  }, []);

  if (errorMessage) {
    return <Text color="red">Error: {errorMessage}</Text>;
  }

  return (
    <>
      <Text>{`Ableton packages in ${packagesPath}`}</Text>
      <Table data={packages} />
    </>
  );
}

export default List;
