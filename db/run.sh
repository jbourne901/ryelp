#!/bin/bash

source ./.env

export logfile=log

source ./scripts.sh


mkdir -p /dev/shm/postgres
chown postgres:postgres /dev/shm/postgres

rm -f $logfile



ewu 00010.createuser.sql
ewd 00030.recreatedb.sql
ewucdb 00070.grant.sql
es 00100.create.sp.trace.sql
es 00120.create-table-log.sql
es 00125.create-sp-logadd.sql
es 00130.create-sp-logjsonadd.sql

ess 00150.create-extension-dblink.sql
ess 00151.create-extension-uuid.sql
ess 00152.create-extension-pgcrypto.sql

es 00160.create.sp.makeramtablespace.sql
ess 00170.createtablespace.sql


es 00180.create-types.sql

es 00400.create.sql

es 00500.fill.sql
