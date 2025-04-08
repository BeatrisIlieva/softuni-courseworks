def show_last_viewed_jewelries_middleware(get_response):
    def middleware(request, *args, **kwargs):
        request.jewelries = request.session.get('last_viewed_jewelries', [])
        return get_response(request, *args, **kwargs)
    return middleware