# t

## Drafting idea

1. Read raw data
2. Parse raw data
3. Model data into one large object
4. Provide access to current item as reference in large object 
5. Provide access to whole data object via db namespace

itemPath --> replace('/' with '') within object
list of items within a single folder

data - for each extension there is a parser, else copy (via buffer? or set encoding?)

### Notes

for 4. and 5. folders and files must not have same name
and files with different ext may have same name, but the 
value mustn't parse to a primitive type for more than one file 
(for example only one file may be a string, number, etc., 
all others must be objects)

Template engine processing is separate from parsing (parsing is done before)

Each these is installed as a packing (npm module)
(How to list themes? How to select theme?)
theme 	/ templates
		/ files
		/ settings
		/ template engine 
		/ parsers
		
_template : template files content
_data : access to all data dir content
_all : sibling data objects all in a
_content : content of current object
and current item properties

---

# Version 1

1. Read & understand data
Read & parse data. Templates are not data

2. Where to show data
Match data to templates.

3. (How to) display data
Run template engine with appropriate data, template files, 
includes and other extensions of the template engine
