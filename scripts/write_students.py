from mongoengine import *
import pandas as pd
import numpy as np
import datetime as dt
from dateutil import parser
from dateutil.tz import gettz


connect(
  host='XXX'
)


class Student(Document):
  meta = {'collection': 'students', 'index': 'matricula'}

  matricula = StringField(required=True)
  registrationDate = DateTimeField(required=True)
  names = StringField(required=True)
  surnames = StringField(required=True)
  grade = DecimalField(required=True)
  registeredGroup = StringField()


students = Student.objects(
  matricula__startswith='A0',
  registeredGroup__exists=False,
)

student_data = []
print(len(students))
for s in students:
  reg_date = s.registrationDate
  actual_reg_date = reg_date - dt.timedelta(hours=6)
  student_data.append(dict(
    matricula=s.matricula,
    fechaDeRegistro=actual_reg_date.strftime('%d/%m/%Y %H:%M'),
    nombres=s.names,
    apellidos=s.surnames,
  ))
print(len(student_data))

df = pd.DataFrame(student_data)
df.to_csv('alumnos_no_registrados.csv')

