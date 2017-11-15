""" convert raw data(js/data.json) to README.md """
import json
import time
import sys
from colorama import init, Fore, Back

init()  # colorama


def progress(idx, length):
    """ show progress """
    time.sleep(0.01)
    sys.stdout.write(Fore.WHITE + Back.CYAN +
                     '\r[ {0} / {1} ]'.format(idx, length))
    sys.stdout.flush()


with open('js/data.json', encoding='utf-8') as rawData:
    DATA = json.load(rawData)

README = open('./README.md', 'w', newline='\n', encoding='utf-8')

README.write(
    '# [Front-end Navigation](https://akccakcctw.github.io/frontend-navigation/)\n\n')
for t in range(len(DATA)):  # t: type
    progress(t, len(DATA))
    README.write('## [{0}({1})]({2}{1})\n'.format(
        DATA[t]['name'], DATA[t]['type'], 'https://akccakcctw.github.io/frontend-navigation/#'))
    for l in DATA[t]['data']:  # l: list
        README.write(
            '- [{0}]({1}) - {2}\n'.format(l['name'], l['url'], l['desc']))
    README.write('\n')

README.close()
sys.stdout.write('\r[___done___]\n')
