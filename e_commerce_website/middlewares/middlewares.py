import datetime


def measure_execution_time(get_response):
    def middleware(request, * args, **kwargs):
        start_time = datetime.datetime.now()
        response = get_response(request, *args, **kwargs)
        end_time = datetime.datetime.now()

        print(f'Executed in {end_time - start_time} seconds')

        return response

    return middleware