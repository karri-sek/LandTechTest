import Application from '../src/application/app';
import { loadData } from '../src/landRegistryDataLoader/dataLoader';

(async (PORT) => {
    const app = Application();
    loadData('../resources/land_ownership.csv', '../resources/company_relations.csv');
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
})(5000);
