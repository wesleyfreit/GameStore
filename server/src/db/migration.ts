import database from './database';

import '../models/User';
import '../models/Game';
import '../models/Genre';

database.sync({ force: false });
