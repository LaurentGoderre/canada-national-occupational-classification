/* global module:true */
(function() {

	function noc(data) {
		var root = data.noc,
			indexes = root.slice(),
			nocList = [],
			roots = [],
			exceptions = {},
			getParent = function(id) {
				var parentId = id.substr(0, id.length - 1),
					parent = nocList[indexes.indexOf(parentId)];

				if (parent === undefined) {
					parent = nocList[exceptions[parentId]];
				}

				return parent;
			},
			getParentFn = function(parent) {
				return function() {
					return parent;
				};
			},
			getExceptionEdge = function(id) {
				return parseInt(id.substr(id.length - 1), 10);
			},
			getNoc = function(id) {
				return this.groups[this._indexes.indexOf(id)];
			},
			o, id, obj, parent, pairs, prefix, p, min, max;

		for (o = 0; o < root.length; o++) {
			id = root[o];

			obj = {
				id: id
			};

			if (id.length === 1) {
				roots.push(obj);
			} else {
				parent = getParent(id);
				if (parent !== undefined) {
					obj.getParent = getParentFn(parent);
				} else {
					if (id.indexOf("-") !== - 1) {
						pairs = id.split("-");
						parent = getParent(pairs[0]);
						obj.getParent = getParentFn(parent);
						prefix = pairs[0].substr(0, pairs[0].length - 1);
						min = getExceptionEdge(pairs[0]);
						max = getExceptionEdge(pairs[1]);
						for (p = min; p <= max; p++) {
							exceptions[prefix + p] = o;
						}
					}
				}
				if (!parent.children) {
					parent.children = [];
				}
				parent.children.push(obj);
			}

			nocList.push(obj);
		}
		return {
			groups: nocList,
			roots: roots,
			_indexes: indexes,
			getNoc: getNoc
		};
	}

	if (typeof module !== "undefined") {
		module.exports = noc;
	} else {
		this.canada_noc = noc;
	}
})();
