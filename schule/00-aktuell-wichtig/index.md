---
layout: schule
title:  "Aktuelles"
published: true
weight: 0
---

{% for post in site.posts %}
- [<b>{{post.title}}</b> ({% include german_date.html post_date=post.date %})]({{post.url}})
{% endfor %}
