function getImgUrl(name) {
	if (name.startsWith("http")) {
		return name;
	}
	return new URL(`../assets/books/${name}`, import.meta.url);
}

export { getImgUrl };
