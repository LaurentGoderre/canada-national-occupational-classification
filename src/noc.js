/* global module:true */
(function() {

	function noc(data) {
		var root = data.noc,
			indexes = root.slice(),
			nocList = [],
			roots = [],
			o, parentId, id, obj, parent;

		for (o = 0; o < root.length; o++) {
			id = root[o];
			parentId = id.substr(0, id.length - 1);
			parent = nocList[indexes.indexOf(parentId)];

			obj = {
				id: id
			};

			if (id.length === 1) {
				roots.push(obj);
			}

			if (parent !== undefined) {
				obj.parent = parent;

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
			_indexes: indexes
		};
	}

	if (typeof module !== "undefined") {
		module.exports = noc;
	} else {
		this.canada_noc = noc;
	}
})();
