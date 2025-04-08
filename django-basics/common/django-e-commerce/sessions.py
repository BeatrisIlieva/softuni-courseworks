def show_last_viewed(request, pk):
    last_viewed = request.session.get('last_viewed_jewelries', [])

    # request.session._auth_user_id

    last_viewed.append(pk)

    request.session['last_viewed_jewelries'] = last_viewed


# def show_last_viewed(request, pk):
#     last_viewed = request.session.get('last_viewed_jewelries', [])
#
#     # request.session._auth_user_id
#
#     last_viewed.append(pk)

