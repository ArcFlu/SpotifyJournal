def get_database():
    from pymongo import MongoClient
    import pymongo

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = ""

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)
     
    return client['personalDB']


dbname = get_database()
collection_name = dbname["31eppvm7775b2t7e5bkmtu5qduwu"]

item_details = collection_name.find()

from collections import Counter
from pandas import DataFrame
import pandas

items_df = DataFrame(item_details)
songDict = []
for index, row in items_df.iterrows():
    for song in row['recentList']:
        songDict.append(tuple([ song.get('id'),
                                song.get('name'), 
                                song.get('album').get('images')[0].get('url'), 
                                song.get('preview_url')]))
        # print(song.keys())


for item in Counter(songDict).most_common():
    print(item)
