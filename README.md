# PerfAnalyticsAPI

PerfAnalytics.API is a restful API which saves data, posted from PerfAnalytics.JS and returns time
specific filtered data.

## Acceptance Criterias

- It should handle min 200 RPS (a proof is a big plus)
- It should calculate dashboard metrics < 1 second
- It should return data between specific dates or only last 30 minutes(big plus)
- It should be well designed for future implementations.
- It should be well tested
- It should be properly designed for REST standards

## Local setup

Pull and run local db instance
```
npm run db:prepare
```

Run db migrations
```
npm run db:migrate
```

Run seeds
```
npm run db:seedAll
```

**or all db commands in order** 

```
npm run db:local
```

Run dev server
```
npm run dev
```

Sequelize CLI Model Generation

```
generateModels.sh
```