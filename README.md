# Degree Audit Parser
We were unhappy with Ohio States degree audit format. It lacked specific course details, prerequisits for each course, and had disgusting UI. So, we created "Degree Audit Parser" as a modern and user friendly Degree Audit to help make OSU students lifes easier.

How It works
We requests an .html version of the users degree audit. Then we parse the data into categories and subcategories of courses. This data is then uses Class Search API (classes.osu.edu) to find the course titles, course details, and course prerequisits.


# Before:

# After:
![Demo](https://private-user-images.githubusercontent.com/55721629/378212822-dcc5b284-3a2b-48ec-99a8-356bd785e1b1.mov?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mjk0NDYwNjUsIm5iZiI6MTcyOTQ0NTc2NSwicGF0aCI6Ii81NTcyMTYyOS8zNzgyMTI4MjItZGNjNWIyODQtM2EyYi00OGVjLTk5YTgtMzU2YmQ3ODVlMWIxLm1vdj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMjAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDIwVDE3MzYwNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTYzMzE3MTczOTI5N2VkNTJkNGRhODhkMTNiZmExNjZiN2U4ZWFmMDYzNmNjMGJhMDI2NWY1NjE3NDhiOTYyNjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.4t_rhs5jAcpRj1s702OpDR6g0Xaes8fh3oVI7nCNC5Y)
