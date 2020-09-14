#!/usr/bin/env python

import json
import csv

if __name__ == '__main__':
    print('-- starting --')
    c_title = ('id', 'name', 'num', 'descr', 'link')
    with open('data.csv', 'r') as cf:
        reader = csv.DictReader(cf, c_title)
        next(reader)
        with open('data.json', 'w') as jf:
            data_dict = {
                "title": "既然选择了远方，便只顾风雨兼程！",
                "subtitle": "公众号：博人撰",
                "data": [row for row in reader]
            }
            jf.write(json.dumps(data_dict))
    print('-- success --')
