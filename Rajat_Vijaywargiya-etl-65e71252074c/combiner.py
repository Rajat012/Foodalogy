import glob
import json
path = "C:\\Users\\Rajat\\Downloads\\archive\\JSON\\*.json"
result = []
for fname in glob.glob(path):
    with open(fname, 'r') as infile:
            result.extend(json.load(infile))

    with open('C:\\Users\\Rajat\\Downloads\\archive\\FinalJson.json', 'w') as output_file:
        json.dump(result, output_file)