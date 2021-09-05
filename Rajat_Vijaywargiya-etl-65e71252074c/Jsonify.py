import csv 
import glob
import json 

def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []
      
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf) 

        for row in csvReader: 
            jsonArray.append(row)
  
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)


path = "C:\\Users\\Rajat\\Downloads\\archive\\CSV\\*.csv"
for fname in glob.glob(path):
    fname2 = fname.replace("CSV","JSON")
    csv_to_json(fname, fname2.replace("csv","json"))

 
