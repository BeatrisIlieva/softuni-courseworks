import datetime


def measure_execution_time_middleware(get_response):
    def middleware(request, *args, **kwargs):
        start_time = datetime.datetime.now()
        response = get_response(request, *args, **kwargs)
        end_time = datetime.datetime.now()

        print(f'Executed in {end_time - start_time} seconds')

        return response

    return middleware


def set_profile_middleware(get_response):
    def middleware(request, *args, **kwargs):
        # if request.host === '':
        #     return get_response(request, *args, **kwargs) to limit where it is executed
        if request.user.is_authenticated:
            request.profile = request.user.profile
        else:
            request.user = None

        return get_response(request, *args, **kwargs)

    return middleware


class ProfileMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request, *args, **kwargs):
        self._middleware(request, *args, **kwargs)
        return self.get_response(request, *args, **kwargs)

    def _middleware(self, request, *args, **kwargs):
        # if request.host === '':
        #     return get_response(request, *args, **kwargs) to limit where it is executed
        if request.user.is_authenticated:
            request.profile = request.user.profile
        else:
            request.user = None
