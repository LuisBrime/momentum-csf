from mongoengine import *
import pandas as pd
import numpy as np
import datetime as dt
from dateutil import parser
from dateutil.tz import gettz

connect(
  host='mongodb+srv://vercel-admin-user:DZbUPmWtUuhwmSEC@momentum.9z6w28y.mongodb.net/db?retryWrites=true&w=majority'
)

class Group(Document):
  meta = { 'collection': 'groups' }

  groupId = StringField(required=True, primary_key=True)
  sessionDate = DateTimeField(required=True)
  moderator = StringField(required=True)
  evaluators = ListField(StringField(), required=True)
  salon = StringField(required=True)
  leftInscriptions = IntField(required=True)

date_str = '21/04/23'

current_group = None
csv_file = pd.read_csv('sesiones.csv')

timezone_info = {'CST': gettz('America/Chicago')}

for row in csv_file.itertuples():
  if row.sesion_id is not np.nan:
    actual_date_str = f'{date_str} {row.hour}'
    session_date_cst = dt.datetime.strptime(
      actual_date_str,
      '%d/%m/%y %H:%M'
    )
    session_date_utc = session_date_cst + dt.timedelta(hours=6)

    current_group = Group(
      groupId=row.sesion_id,
      sessionDate=session_date_utc,
      moderator=row.moderador,
      salon=str(row.salon).replace('.0', ''),
      evaluators=[row.evaluador],
      leftInscriptions=5,
    )
    # current_group = dict(
    #   group_id=row.sesion_id,
    #   session_date=session_date,
    #   moderator=row.moderador,
    #   salon=str(row.salon).replace('.0', ''),
    #   evaluador=[row.evaluador],
    # )
  else:
    current_group.evaluators.append(row.evaluador)
    # current_group['evaluador'].append(row.evaluador)
    print(current_group)
    current_group.save()

disconnect()
