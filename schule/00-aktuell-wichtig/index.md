---
layout: schule
title:  "Aktuell/Wichtig!"
published: true

---

{% for post in site.posts %}
- [<b>{{post.title}}</b> ({% include german_date.html post_date=post.date %})]({{post.url}})
{% endfor %}
