from mongoengine import *
import pandas as pd
import numpy as np
import datetime as dt
from dateutil import parser
from dateutil.tz import gettz

connect(
  host='mongodb+srv://vercel-admin-user:DZbUPmWtUuhwmSEC@momentum.9z6w28y.mongodb.net/db?retryWrites=true&w=majority'
)

class Student(Document):
  meta = {'collection': 'students', 'index': 'matricula'}

  matricula = StringField(required=True)
  registrationDate = DateTimeField(required=True)
  names = StringField(required=True)
  surnames = StringField(required=True)
  grade = DecimalField(required=True)

date_str = '13/04/23'
timezone_info = {'CST': gettz('America/Chicago')}

csv_file = pd.read_csv('alumnes.csv')

for row in csv_file.itertuples():
  if row.programa == 'PBI' or row.periodo != 6:
    continue
  
  reg_time = '17:45'
  if row.promedio >= 95 and row.promedio <= 100:
    reg_time = '16:30'
  elif row.promedio >= 90 and row.promedio < 95:
    reg_time = '16:45'
  elif row.promedio >= 85 and row.promedio < 90:
    reg_time = '17:00'
  elif row.promedio >= 80 and row.promedio < 85:
    reg_time = '17:15'
  elif row.promedio >= 75 and row.promedio < 80:
    reg_time = '17:30'
  
  actual_date_str = f'{date_str} {reg_time}'
  reg_date_cst = dt.datetime.strptime(
    actual_date_str,
    '%d/%m/%y %H:%M'
  )
  reg_date_utc = reg_date_cst + dt.timedelta(hours=6)

  student = Student(
    matricula=row.matricula,
    registrationDate=reg_date_utc,
    names=row.nombres,
    surnames=f'{row.apellido_paterno} {row.apellido_materno}',
    grade=row.promedio,
  )
  print(student)
  student.save()

disconnect()

