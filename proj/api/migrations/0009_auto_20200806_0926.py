# Generated by Django 3.0.8 on 2020-08-06 09:26

import django.contrib.postgres.fields
import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_game_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='field',
            name='fieldmap',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.jsonb.JSONField(), size=None), blank=True, size=None),
        ),
    ]
